import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StickyNote, Plus, Edit2, Trash2, Lock } from 'lucide-react';
import { useClientStore, ClientNote } from '../../store/clientStore';
import Button from '../common/Button';
import { formatDistanceToNow } from 'date-fns';

interface ClientNotesProps {
  clientId: string;
  salonId: string;
}

const ClientNotes: React.FC<ClientNotesProps> = ({ clientId, salonId }) => {
  const { notes, addNote, updateNote, deleteNote } = useClientStore();
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  const [newNote, setNewNote] = useState<Partial<ClientNote>>({
    type: 'general',
    title: '',
    content: '',
    private: true
  });

  const handleAddNote = async () => {
    if (!newNote.title || !newNote.content) return;

    await addNote({
      clientId,
      salonId,
      type: newNote.type as ClientNote['type'],
      title: newNote.title,
      content: newNote.content,
      private: newNote.private || true
    });

    setNewNote({
      type: 'general',
      title: '',
      content: '',
      private: true
    });
    setIsAddingNote(false);
  };

  const handleUpdateNote = async (noteId: string) => {
    const note = notes.find(n => n.id === noteId);
    if (!note) return;

    await updateNote(noteId, {
      title: newNote.title || note.title,
      content: newNote.content || note.content,
      type: newNote.type as ClientNote['type'] || note.type,
      private: newNote.private ?? note.private
    });

    setEditingNoteId(null);
    setNewNote({
      type: 'general',
      title: '',
      content: '',
      private: true
    });
  };

  const handleDeleteNote = async (noteId: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      await deleteNote(noteId);
    }
  };

  const noteTypeOptions = [
    { value: 'service_note', label: 'Service Note' },
    { value: 'preference', label: 'Preference' },
    { value: 'allergy', label: 'Allergy' },
    { value: 'general', label: 'General' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <StickyNote className="w-5 h-5 text-primary-600 mr-2" />
          <h2 className="text-lg font-medium">Client Notes</h2>
        </div>
        {!isAddingNote && (
          <Button
            variant="outline"
            size="small"
            onClick={() => setIsAddingNote(true)}
            className="flex items-center"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Note
          </Button>
        )}
      </div>

      <AnimatePresence>
        {(isAddingNote || editingNoteId) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-neutral-50 rounded-lg p-4 mb-4"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Note Type
                </label>
                <select
                  value={newNote.type}
                  onChange={(e) => setNewNote({ ...newNote, type: e.target.value as ClientNote['type'] })}
                  className="w-full rounded-lg border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                >
                  {noteTypeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  className="w-full rounded-lg border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                  placeholder="Note title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Content
                </label>
                <textarea
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  className="w-full rounded-lg border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                  rows={4}
                  placeholder="Note content"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={newNote.private}
                  onChange={(e) => setNewNote({ ...newNote, private: e.target.checked })}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                />
                <label className="ml-2 text-sm text-neutral-700">
                  Private note (visible only to salon staff)
                </label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAddingNote(false);
                    setEditingNoteId(null);
                    setNewNote({
                      type: 'general',
                      title: '',
                      content: '',
                      private: true
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => editingNoteId ? handleUpdateNote(editingNoteId) : handleAddNote()}
                >
                  {editingNoteId ? 'Update Note' : 'Add Note'}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {notes.map((note) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-soft p-4"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center">
                  <h3 className="font-medium">{note.title}</h3>
                  {note.private && (
                    <Lock className="w-4 h-4 text-neutral-400 ml-2" />
                  )}
                </div>
                <p className="text-sm text-neutral-500">
                  {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditingNoteId(note.id);
                    setNewNote({
                      type: note.type,
                      title: note.title,
                      content: note.content,
                      private: note.private
                    });
                  }}
                  className="p-1 text-neutral-400 hover:text-primary-600"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="p-1 text-neutral-400 hover:text-error-600"
                >
                  <Trash2  className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="bg-neutral-50 rounded p-3">
              <p className="text-neutral-700 whitespace-pre-wrap">{note.content}</p>
            </div>
            <div className="mt-2">
              <span className="inline-block px-2 py-1 bg-primary-50 text-primary-700 rounded text-xs">
                {noteTypeOptions.find(option => option.value === note.type)?.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ClientNotes;

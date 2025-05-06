import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, MessageSquare, Calendar, Clock } from 'lucide-react';
import { useConciergeStore } from '../../store/conciergeStore';
import { useAuthStore } from '../../store/authStore';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import ConciergeRequestForm from '../../components/concierge/ConciergeRequestForm';
import ConciergeChat from '../../components/concierge/ConciergeChat';
import { format } from 'date-fns';

const ConciergeService = () => {
  const { user } = useAuthStore();
  const { requests, fetchRequests } = useConciergeStore();
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchRequests(user.id);
    }
  }, [user, fetchRequests]);

  return (
    <div className="pb-20 pt-4 px-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Crown className="w-6 h-6 text-secondary-500 mr-2" />
          <h1 className="text-2xl font-bold">VIP Concierge</h1>
        </div>
        {!showRequestForm && !selectedRequestId && (
          <Button
            onClick={() => setShowRequestForm(true)}
            className="flex items-center"
          >
            New Request
          </Button>
        )}
      </div>

      {showRequestForm ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium">New Concierge Request</h2>
              <button
                onClick={() => setShowRequestForm(false)}
                className="text-neutral-600 hover:text-neutral-900"
              >
                Cancel
              </button>
            </div>
            <ConciergeRequestForm
              onSubmit={() => setShowRequestForm(false)}
            />
          </Card>
        </motion.div>
      ) : selectedRequestId ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-[calc(100vh-8rem)]"
        >
          <Card className="h-full overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-medium">Concierge Chat</h2>
              <button
                onClick={() => setSelectedRequestId(null)}
                className="text-neutral-600 hover:text-neutral-900"
              >
                Back to Requests
              </button>
            </div>
            <ConciergeChat requestId={selectedRequestId} />
          </Card>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card
                onClick={() => setSelectedRequestId(request.id)}
                className="p-4 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    {request.type === 'appointment' ? (
                      <Calendar className="w-5 h-5 text-primary-600 mr-2" />
                    ) : request.type === 'group' ? (
                      <MessageSquare className="w-5 h-5 text-secondary-600 mr-2" />
                    ) : (
                      <Crown className="w-5 h-5 text-accent-600 mr-2" />
                    )}
                    <h3 className="font-medium capitalize">
                      {request.type.replace('_', ' ')} Request
                    </h3>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    request.status === 'completed'
                      ? 'bg-success-100 text-success-700'
                      : request.status === 'in_progress'
                        ? 'bg-primary-100 text-primary-700'
                        : request.status === 'cancelled'
                          ? 'bg-error-100 text-error-700'
                          : 'bg-warning-100 text-warning-700'
                  }`}>
                    {request.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-neutral-600">
                  {request.details.date && (
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {format(new Date(request.details.date), 'MMM d, yyyy')}
                      {request.details.time && (
                        <>
                          <Clock className="w-4 h-4 ml-4 mr-2" />
                          {request.details.time}
                        </>
                      )}
                    </div>
                  )}
                  
                  {request.assignedConcierge && (
                    <p>Concierge: {request.assignedConcierge.name}</p>
                  )}

                  <div className="flex flex-wrap gap-2 mt-2">
                    {request.details.preferences.map((pref, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-neutral-100 rounded-full text-xs"
                      >
                        {pref}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t flex items-center justify-between text-sm">
                  <span className="text-neutral-500">
                    Last updated {format(new Date(request.updatedAt), 'MMM d, h:mm a')}
                  </span>
                  <span className="text-primary-600">
                    {request.messages.length} messages
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConciergeService;

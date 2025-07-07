
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Member } from '../types/member';
import MemberForm from '../components/MemberForm';
import EditMemberForm from '../components/EditMemberForm';
import MembersList from '../components/MembersList';

const Members = () => {
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const handleAddMember = () => {
    setView('add');
  };

  const handleEditMember = (member: Member) => {
    setSelectedMember(member);
    setView('edit');
  };

  const handleSuccess = () => {
    setView('list');
    setSelectedMember(null);
  };

  const handleCancel = () => {
    setView('list');
    setSelectedMember(null);
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
            <p className="mt-2 text-gray-600">
              Administra la información de todos los miembros del gimnasio
            </p>
          </div>
          {view === 'list' && (
            <Button 
              onClick={handleAddMember}
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Miembro
            </Button>
          )}
        </div>
      </div>

      {view === 'list' && (
        <MembersList onEdit={handleEditMember} />
      )}

      {view === 'add' && (
        <MemberForm onSuccess={handleSuccess} onCancel={handleCancel} />
      )}

      {view === 'edit' && selectedMember && (
        <EditMemberForm 
          member={selectedMember}
          onSuccess={handleSuccess} 
          onCancel={handleCancel} 
        />
      )}
    </div>
  );
};

export default Members;

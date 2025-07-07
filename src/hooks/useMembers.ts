
import { useLocalStorage } from './useLocalStorage';
import { Member, Plan, PLAN_TYPES, MembershipStatus } from '../types/member';
import { v4 as uuidv4 } from 'uuid';

export function useMembers() {
  const [members, setMembers] = useLocalStorage<Member[]>('gymtrack-members', []);

  const addMember = (memberData: Omit<Member, 'id' | 'registrationDate' | 'plan' | 'status'>, planId: string) => {
    const planType = PLAN_TYPES.find(p => p.id === planId);
    if (!planType) throw new Error('Plan no válido');

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + planType.duration);

    const plan: Plan = {
      id: uuidv4(),
      name: planType.name,
      duration: planType.duration,
      price: planType.price,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
    };

    const newMember: Member = {
      ...memberData,
      id: uuidv4(),
      registrationDate: new Date().toISOString().split('T')[0],
      plan,
      status: 'active',
    };

    setMembers(prev => [...prev, newMember]);
    return newMember;
  };

  const updateMember = (id: string, updates: Partial<Member>) => {
    setMembers(prev => prev.map(member => 
      member.id === id ? { ...member, ...updates } : member
    ));
  };

  const deleteMember = (id: string) => {
    setMembers(prev => prev.filter(member => member.id !== id));
  };

  const getMemberById = (id: string) => {
    return members.find(member => member.id === id);
  };

  const updateMemberStatus = (id: string, status: MembershipStatus) => {
    updateMember(id, { status });
  };

  const assignPlan = (memberId: string, planId: string) => {
    const planType = PLAN_TYPES.find(p => p.id === planId);
    if (!planType) throw new Error('Plan no válido');

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + planType.duration);

    const plan: Plan = {
      id: uuidv4(),
      name: planType.name,
      duration: planType.duration,
      price: planType.price,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
    };

    updateMember(memberId, { plan, status: 'active' });
  };

  const getStats = () => {
    const active = members.filter(m => m.status === 'active').length;
    const expired = members.filter(m => m.status === 'expired').length;  
    const suspended = members.filter(m => m.status === 'suspended').length;
    const total = members.length;

    return { active, expired, suspended, total };
  };

  return {
    members,
    addMember,
    updateMember,
    deleteMember,
    getMemberById,
    updateMemberStatus,
    assignPlan,
    getStats,
  };
}

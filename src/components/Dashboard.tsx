
import React from 'react';
import { Users, UserCheck, UserX, Clock } from 'lucide-react';
import { useMembers } from '../hooks/useMembers';
import StatsCard from './StatsCard';

const Dashboard = () => {
  const { getStats } = useMembers();
  const stats = getStats();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Resumen general de la gestión del gimnasio
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total de Miembros"
          value={stats.total}
          icon={<Users className="w-6 h-6 text-white" />}
          color="bg-yellow-500"
        />
        <StatsCard
          title="Membresías Activas"
          value={stats.active}
          icon={<UserCheck className="w-6 h-6 text-white" />}
          color="bg-green-500"
        />
        <StatsCard
          title="Membresías Vencidas"
          value={stats.expired}
          icon={<Clock className="w-6 h-6 text-white" />}
          color="bg-red-500"
        />
        <StatsCard
          title="Membresías Suspendidas"
          value={stats.suspended}
          icon={<UserX className="w-6 h-6 text-white" />}
          color="bg-gray-500"
        />
      </div>

      <div className="mt-8 bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Bienvenido a GymTrack
        </h2>
        <p className="text-gray-600 mb-4">
          Sistema integral de gestión para gimnasios. Controla a tus miembros, 
          pagos y estadísticas desde un solo lugar.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <Users className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900">Gestión de Usuarios</h3>
            <p className="text-sm text-gray-500">
              Registra y administra la información de todos los miembros
            </p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <Clock className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-sm text-gray-500">
              Próximamente: Control de pagos y facturación
            </p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <Users className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-sm text-gray-500">
              Próximamente: Reportes y estadísticas avanzadas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

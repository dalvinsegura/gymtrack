
import React from 'react';
import { CreditCard, Clock } from 'lucide-react';

const Payments = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Control de Pagos</h1>
        <p className="mt-2 text-gray-600">
          Gestión de pagos y facturación (próximamente)
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-12 text-center">
        <CreditCard className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Módulo en Desarrollo
        </h2>
        <p className="text-gray-600 mb-6">
          El módulo de control de pagos estará disponible próximamente. 
          Incluirá funcionalidades como:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <div className="text-left p-4 border border-gray-200 rounded-lg">
            <Clock className="w-6 h-6 text-yellow-500 mb-2" />
            <h3 className="font-medium text-gray-900">Gestión de Pagos</h3>
            <p className="text-sm text-gray-500">
              Registro y seguimiento de pagos de membresías
            </p>
          </div>
          <div className="text-left p-4 border border-gray-200 rounded-lg">
            <Clock className="w-6 h-6 text-yellow-500 mb-2" />
            <h3 className="font-medium text-gray-900">Facturación</h3>
            <p className="text-sm text-gray-500">
              Generación automática de facturas y recibos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;

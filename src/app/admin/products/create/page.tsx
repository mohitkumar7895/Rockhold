'use client';

import React from 'react';
import { AdminHeader } from '@/components/layout/AdminHeader';
import { ProductForm } from '@/components/admin/ProductForm';

export default function CreateProductPage() {
  return (
    <div>
      <AdminHeader
        title="Add New Formulation"
        subtitle="Create a new construction chemical or tile adhesive product"
      />

      <div className="p-6 sm:p-8 max-w-7xl">
        <ProductForm isEdit={false} />
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { AdminHeader } from '@/components/layout/AdminHeader';
import { ProductForm } from '@/components/admin/ProductForm';
import { Product } from '@/types';
import { useToast } from '@/components/ui/toast';

export default function EditProductPage() {
  const params = useParams();
  const id = params.id as string;
  const { error: toastError } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) {
          throw new Error('Failed to load product');
        }
        const data = await res.json();
        setProduct(data.product);
      } catch (err: any) {
        toastError(err.message || 'Error fetching product');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div>
        <AdminHeader title="Edit Product Formulation" subtitle="Loading..." />
        <div className="p-10 text-center text-sm text-slate-500">
          Loading product specifications from database...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <AdminHeader title="Edit Product Formulation" subtitle="Not Found" />
        <div className="p-10 text-center text-sm text-red-500">
          Product not found or was deleted.
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminHeader
        title={`Edit: ${product.name}`}
        subtitle={`Update specifications and details for /products/${product.slug}`}
      />

      <div className="p-6 sm:p-8 max-w-7xl">
        <ProductForm initialData={product} isEdit={true} />
      </div>
    </div>
  );
}

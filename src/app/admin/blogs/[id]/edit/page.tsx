'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { BlogForm } from '@/components/admin/BlogForm';
import { BlogPost } from '@/types';
import { useToast } from '@/components/ui/toast';

export default function EditBlogPage() {
  const params = useParams();
  const id = params.id as string;
  const { error: toastError } = useToast();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlog() {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to load article');
        setBlog(data.blog);
      } catch (err: any) {
        toastError(err.message || 'Error loading article');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadBlog();
    }
  }, [id, toastError]);

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400">
        Loading article details...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="py-20 text-center text-slate-500">
        Article not found.
      </div>
    );
  }

  return <BlogForm initialData={blog} isEditing={true} />;
}

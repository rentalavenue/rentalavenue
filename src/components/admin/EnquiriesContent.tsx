'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ArrowLeft, Eye, Trash2 } from 'lucide-react'
import type { Enquiry } from '@/lib/types'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'

interface EnquiriesContentProps {
  initialEnquiries: Enquiry[]
}

export default function EnquiriesContent({ initialEnquiries }: EnquiriesContentProps) {
  const [enquiries, setEnquiries] = useState(initialEnquiries)
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const router = useRouter()

  const handleView = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return

    try {
      const { error } = await supabase.from('enquiries').delete().eq('id', id)
      if (error) throw error

      toast.success('Enquiry deleted successfully')
      router.refresh()

      const { data } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false })
      setEnquiries(data || [])
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Delete failed'
      toast.error(errorMessage)
    }
  }

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('enquiries')
        .update({ status })
        .eq('id', id)

      if (error) throw error

      toast.success('Status updated successfully')
      router.refresh()

      const { data } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false })
      setEnquiries(data || [])
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Update failed'
      toast.error(errorMessage)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <Link 
          href="/admin/dashboard" 
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">Enquiries</h1>
        <p className="text-slate-600 mt-2">View and manage customer enquiries</p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enquiries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                  No enquiries yet.
                </TableCell>
              </TableRow>
            ) : (
              enquiries.map((enquiry) => (
                <TableRow key={enquiry.id}>
                  <TableCell>
                    {new Date(enquiry.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-medium">{enquiry.name}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{enquiry.mobile}</div>
                      <div className="text-slate-500">{enquiry.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {enquiry.product_name ? (
                      <div>
                        <div className="font-medium">{enquiry.product_name}</div>
                        <div className="text-xs text-slate-500">{enquiry.category_name}</div>
                      </div>
                    ) : (
                      <span className="text-slate-400">General Enquiry</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={enquiry.status === 'new' ? 'default' : 'secondary'}
                      className="cursor-pointer"
                      onClick={() => handleStatusUpdate(
                        enquiry.id,
                        enquiry.status === 'new' ? 'resolved' : 'new'
                      )}
                    >
                      {enquiry.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleView(enquiry)}
                      className="mr-2"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(enquiry.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Enquiry Details</DialogTitle>
          </DialogHeader>
          {selectedEnquiry && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-700">Name</h3>
                  <p className="text-slate-900">{selectedEnquiry.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-700">Date</h3>
                  <p className="text-slate-900">
                    {new Date(selectedEnquiry.created_at).toLocaleString()}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-700">Mobile</h3>
                  <p className="text-slate-900">{selectedEnquiry.mobile}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-700">Email</h3>
                  <p className="text-slate-900">{selectedEnquiry.email}</p>
                </div>
              </div>

              {selectedEnquiry.product_name && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-700">Product</h3>
                  <p className="text-slate-900">{selectedEnquiry.product_name}</p>
                  <p className="text-sm text-slate-500">{selectedEnquiry.category_name}</p>
                </div>
              )}

              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-2">Requirement</h3>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-slate-900 whitespace-pre-wrap">
                    {selectedEnquiry.requirement}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-700">Status</h3>
                <Badge variant={selectedEnquiry.status === 'new' ? 'default' : 'secondary'}>
                  {selectedEnquiry.status}
                </Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
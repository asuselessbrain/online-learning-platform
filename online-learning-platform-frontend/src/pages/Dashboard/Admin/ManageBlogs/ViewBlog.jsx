import React, { useMemo } from 'react'
import { useParams, useNavigate } from 'react-router'
import PageHeading from '../../shared/PageHeading'
import useAxios from '../../../../hooks/useAxios'
import { useQuery } from '@tanstack/react-query'

const ViewBlog = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const axios = useAxios()

    const { data, isLoading } = useQuery({
        queryKey: ['blog-details', id],
        queryFn: async () => {
            const res = await axios.get(`/blogs/${id}`)
            return res.data.data
        }
    })

    const blog = data

    // Render tiptap JSON or HTML string into paragraph-by-paragraph React nodes.
    const buildContentNodes = (content) => {
        if (!content) return []

        // If content is an HTML string, parse into paragraphs/elements
        if (typeof content === 'string') {
            try {
                const parser = new DOMParser()
                const doc = parser.parseFromString(content, 'text/html')
                const nodes = Array.from(doc.body.childNodes).map((node, idx) => {
                    if (node.nodeName === 'P' || node.nodeName === 'DIV') {
                        return <p key={idx} dangerouslySetInnerHTML={{ __html: node.innerHTML }} className="mb-4 leading-relaxed" />
                    }
                    if (node.nodeName === 'H1' || node.nodeName === 'H2' || node.nodeName === 'H3') {
                        const Tag = node.nodeName.toLowerCase()
                        return <Tag key={idx} dangerouslySetInnerHTML={{ __html: node.innerHTML }} className="font-semibold mt-4 mb-2" />
                    }
                    if (node.nodeName === 'UL') {
                        return <ul key={idx} className="list-disc pl-6 mb-4" dangerouslySetInnerHTML={{ __html: node.innerHTML }} />
                    }
                    if (node.nodeName === 'OL') {
                        return <ol key={idx} className="list-decimal pl-6 mb-4" dangerouslySetInnerHTML={{ __html: node.innerHTML }} />
                    }
                    // fallback: render outerHTML
                    return <div key={idx} dangerouslySetInnerHTML={{ __html: node.outerHTML }} />
                })
                return nodes
            } catch (e) {
                return [<p key={0} className="mb-4">{content}</p>]
            }
        }

        // If content appears to be Tiptap JSON (ProseMirror doc), walk nodes
        if (content.type === 'doc' && Array.isArray(content.content)) {
            const nodes = []
            content.content.forEach((block, idx) => {
                if (block.type === 'paragraph') {
                    const text = (block.content || []).map(c => c.text || '').join('')
                    nodes.push(<p key={idx} className="mb-4 leading-relaxed">{text}</p>)
                } else if (block.type === 'heading') {
                    const text = (block.content || []).map(c => c.text || '').join('')
                    const Tag = `h${block.attrs?.level || 3}`
                    nodes.push(React.createElement(Tag, { key: idx, className: 'font-semibold mt-4 mb-2' }, text))
                } else if (block.type === 'bulletList') {
                    const items = (block.content || []).map((li, i) => {
                        const t = (li.content?.[0]?.content || []).map(c => c.text || '').join('')
                        return <li key={i}>{t}</li>
                    })
                    nodes.push(<ul key={idx} className="list-disc pl-6 mb-4">{items}</ul>)
                } else if (block.type === 'orderedList') {
                    const items = (block.content || []).map((li, i) => {
                        const t = (li.content?.[0]?.content || []).map(c => c.text || '').join('')
                        return <li key={i}>{t}</li>
                    })
                    nodes.push(<ol key={idx} className="list-decimal pl-6 mb-4">{items}</ol>)
                } else if (block.type === 'image') {
                    nodes.push(<img key={idx} src={block.attrs?.src} alt={block.attrs?.alt || ''} className="w-full rounded mb-4" />)
                } else if (block.type === 'codeBlock') {
                    const code = (block.content || []).map(c => c.text || '').join('')
                    nodes.push(<pre key={idx} className="bg-gray-100 p-3 rounded mb-4 overflow-auto"><code>{code}</code></pre>)
                } else {
                    // fallback: show JSON
                    nodes.push(<pre key={idx} className="bg-gray-50 p-2 rounded mb-4">{JSON.stringify(block)}</pre>)
                }
            })
            return nodes
        }

        // default fallback
        return [<p key={0} className="mb-4">No content available.</p>]
    }

    const contentNodes = useMemo(() => buildContentNodes(blog?.content), [blog?.content])

    const plainTextForReading = useMemo(() => {
        return contentNodes.map(n => {
            if (typeof n === 'string') return n
            // Try to extract text from props.children or dangerouslySetInnerHTML
            const props = n.props || {}
            if (props.dangerouslySetInnerHTML && props.dangerouslySetInnerHTML.__html) {
                return props.dangerouslySetInnerHTML.__html.replace(/<[^>]+>/g, ' ')
            }
            if (typeof props.children === 'string') return props.children
            return ''
        }).join(' ').replace(/\s+/g, ' ').trim()
    }, [contentNodes])

    const readingTime = useMemo(() => {
        const words = plainTextForReading ? plainTextForReading.split(' ').length : 0
        return Math.max(1, Math.ceil(words / 200))
    }, [plainTextForReading])

    if (isLoading) return <div className="p-6">Loading...</div>

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <PageHeading title="Blog Details" subtitle="View information about this blog post" />
                <button onClick={() => navigate(-1)} className="px-3 py-2 rounded-md bg-gray-100">Back</button>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#F3F4F6]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                        {blog?.thumbnail && (
                            <div className="w-full h-52 md:h-64 rounded-lg overflow-hidden shadow-sm mb-4">
                                <img src={blog.thumbnail} alt="banner" className="w-full h-full object-cover" />
                            </div>
                        )}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div>
                                <h3 className="text-2xl font-semibold text-[#111827]">{blog?.title || 'Untitled'}</h3>
                                {blog?.subTitle && <p className="text-gray-600 mt-1">{blog.subTitle}</p>}

                                <div className="mt-3 flex items-center gap-3 text-sm text-gray-500">
                                    <span>{blog?.author || blog?.instructorName || 'Author'}</span>
                                    <span>•</span>
                                    <span>{blog?.createdAt ? new Date(blog.createdAt).toLocaleDateString() : '—'}</span>
                                    <span>•</span>
                                    <span>{readingTime} min read</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${blog?.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {blog?.status || '—'}
                                </span>
                                <button onClick={() => navigate(`/admin/edit-blog/${blog?._id}`)} className="px-3 py-1 rounded-md bg-[#309255] text-white text-sm">Edit</button>
                            </div>
                        </div>

                        <div className="mt-6 prose max-w-none text-gray-700">
                            {contentNodes && contentNodes.length > 0 ? (
                                contentNodes
                            ) : (
                                <p className="text-gray-600">No content available.</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <div className="bg-[#fafafa] p-4 rounded-lg border border-[#eee]">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Category</p>
                                    <p className="font-medium">{blog?.category?.name || blog?.category || 'N/A'}</p>
                                </div>
                            </div>

                            <div className="mt-4">
                                <p className="text-sm text-gray-500">Tags</p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {(blog?.tags || []).length ? (blog.tags.map((t, i) => (
                                        <span key={i} className="inline-flex items-center bg-[#e7f8ee] text-[#256d45] px-3 py-1.5 rounded-full text-sm">{t}</span>
                                    ))) : <p className="text-sm text-gray-400">—</p>}
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-2">
                                <div>
                                    <p className="text-sm text-gray-500">Status</p>
                                    <p className="text-sm font-medium mt-1">{blog?.status || '—'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Created</p>
                                    <p className="text-sm mt-1">{blog?.createdAt ? new Date(blog.createdAt).toLocaleString() : '—'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewBlog

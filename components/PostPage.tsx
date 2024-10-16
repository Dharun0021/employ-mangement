"use client";
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { db } from '@/Firebases';
import { addDoc, collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { useToast } from "@/hooks/use-toast"


interface PostTableProps {
  title: string;
  limit: number;
}

export const PostPage = ({ title, limit }: PostTableProps) => {
  const { toast } = useToast(); // Use the correct destructuring

  const [posts, setPosts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState({ title: '', author: '' });
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleCreatePost = async () => {
    try {
      await addDoc(collection(db, 'posts'), {
        title: newPost.title,
        author: newPost.author,
        date: new Date().toISOString(), // Automatically add the current date
      });
      setNewPost({ title: '', author: '' }); // Reset form
      toast({
        title: "Success!",
        description: "Post created successfully 🎉",
      }); // Show success toast
    } catch (error) {
      console.error("Error creating post: ", error);
      toast({
        title: "Error",
        description: "Failed to create post.",
        variant: "destructive", // Show error toast with destructive variant
      });
    }
  };

  const handleEdit = (post: any) => {
    setEditingPostId(post.id);
    setNewPost({ title: post.title, author: post.author });
  };

  const handleUpdatePost = async () => {
    if (!editingPostId) return;

    try {
      const postRef = doc(db, 'posts', editingPostId);
      await updateDoc(postRef, {
        title: newPost.title,
        author: newPost.author,
        date: new Date().toISOString(),
      });
      setEditingPostId(null);
      setNewPost({ title: '', author: '' });
      toast({
        title: "Success!",
        description: "Post updated successfully 🎉",
      });
    } catch (error) {
      console.error("Error updating post: ", error);
      toast({
        title: "Error",
        description: "Failed to update post.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full">
      <Card className="w-full mx-auto p-6">
        <CardHeader className="text-center">
          <h3 className="text-2xl font-semibold">Create/Edit Post</h3>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Input
            placeholder="Author"
            value={newPost.author}
            onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
          />
        </CardContent>
        <CardFooter>
          <Button onClick={editingPostId ? handleUpdatePost : handleCreatePost}>
            {editingPostId ? "Update Post" : "Create Post"}
          </Button>
        </CardFooter>

        <Table className="mt-4">
          <TableCaption>A List Of The Recent Posts</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell>{new Date(post.date).toLocaleString()}</TableCell> {/* Format date */}
                <TableCell>
                  <Button onClick={() => handleEdit(post)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default PostPage;

import prisma from "@/src/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/posts/[id] - Retrieve a single post
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const post = await prisma.post.findUnique({
    where: { id: parseInt(params.id) },
    include: { comments: true, votes: true },
  });
  return NextResponse.json(post);
}

// PATCH /api/posts/[id] - Update a post
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { title, content } = await request.json();
  const updatedPost = await prisma.post.update({
    where: { id: parseInt(params.id) },
    data: { title, content },
  });
  return NextResponse.json(updatedPost);
}

// DELETE /api/posts/[id] - Delete a post
export async function DELETE({ params }: { params: { id: string } }) {
  await prisma.post.delete({
    where: { id: parseInt(params.id) },
  });
  return NextResponse.json({ message: "Post deleted" });
}

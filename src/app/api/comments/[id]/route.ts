import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

// GET /api/comments/[id] - Get a single comment
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const comment = await prisma.comment.findUnique({
    where: { id: parseInt(params.id) },
    include: { children: true, votes: true },
  });
  return NextResponse.json(comment);
}

// PATCH /api/comments/[id] - Update a comment
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { content } = await request.json();
  const updatedComment = await prisma.comment.update({
    where: { id: parseInt(params.id) },
    data: { content },
  });
  return NextResponse.json(updatedComment);
}

// DELETE /api/comments/[id] - Delete a comment
export async function DELETE({ params }: { params: { id: string } }) {
  await prisma.comment.delete({
    where: { id: parseInt(params.id) },
  });
  return NextResponse.json({ message: "Comment deleted" });
}

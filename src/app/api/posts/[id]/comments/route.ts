import { NextResponse } from "next/server";
import { generateRandomUserId } from "@/src/utils/randomUserId";
import prisma from "@/src/lib/prisma";

// POST /api/posts/[id]/comments - Create a new comment on a post
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { content, parentId } = await request.json();
  const newComment = await prisma.comment.create({
    data: {
      content,
      randomUserId: generateRandomUserId(),
      postId: parseInt(params.id),
      parentId: parentId ? parseInt(parentId) : null,
    },
  });
  return NextResponse.json(newComment);
}

// GET /api/posts/[id]/comments - Get comments for a specific post
export async function GET({ params }: { params: { id: string } }) {
  const comments = await prisma.comment.findMany({
    where: { postId: parseInt(params.id) },
    include: { children: true, votes: true },
  });
  return NextResponse.json(comments);
}

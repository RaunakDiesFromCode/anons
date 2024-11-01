import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST /api/posts/[id]/votes - Add a vote to a post
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { type } = await request.json();
  const newVote = await prisma.vote.create({
    data: {
      type,
      postId: parseInt(params.id),
    },
  });
  return NextResponse.json(newVote);
}

import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

// POST /api/comments/[id]/votes - Add a vote to a comment
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { type } = await request.json();
  const newVote = await prisma.vote.create({
    data: {
      type,
      commentId: parseInt(params.id),
    },
  });
  return NextResponse.json(newVote);
}

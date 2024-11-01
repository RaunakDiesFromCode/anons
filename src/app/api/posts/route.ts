import { generateRandomUserId } from "@/utils/randomUserId";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// POST /api/posts - Create a new post
export async function POST(request: Request) {
  const { title, content } = await request.json();
  const newPost = await prisma.post.create({
    data: {
      title,
      content,
      randomUserId: generateRandomUserId(),
    },
  });
  return NextResponse.json(newPost);
}

// GET /api/posts - Retrieve all posts
export async function GET() {
  const posts = await prisma.post.findMany({
    include: { Comment: true, Vote: true },
  });
  return NextResponse.json(posts);
}

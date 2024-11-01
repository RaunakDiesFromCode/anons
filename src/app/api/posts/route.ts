import { generateRandomUserId } from "@/utils/randomUserId";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// POST /api/posts - Create a new post
export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();

    // Ensure title and content are provided
    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    // Generate a random user ID
    const randomUserId = generateRandomUserId();

    // Create a new post in the database
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        randomUserId,
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the post" },
      { status: 500 }
    );
  }
}


// GET /api/posts - Retrieve all posts
export async function GET() {
  const posts = await prisma.post.findMany({
    include: { Comment: true, Vote: true },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return NextResponse.json(posts);
}

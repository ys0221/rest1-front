"use client";

import { fetchApi } from "@/lib/client";
import { PostCommentDto, PostDto } from "@/type/post";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { id } = useParams();
  const router = useRouter();

  const [post, setPost] = useState<PostDto | null>(null);
  const [postComments, setPostComments] = useState<PostCommentDto[]>([]);

  useEffect(() => {
    fetchApi(`/api/v1/posts/${id}`).then(setPost);
    fetchApi(`/api/v1/posts/${id}/comments`).then(setPostComments);
  }, []);

  const deletePost = (id: number) => {
    fetchApi(`/api/v1/posts/${id}`, {
      method: "DELETE",
    }).then((data) => {
      alert(data.msg);
      router.replace("/posts");
    });
  };

  if (post === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="p-2">글 상세 보기</h1>

      <div>
        <div>번호 : {post.id}</div>
        <div>제목 : {post.title}</div>
        <div>내용 : {post.content}</div>
      </div>

      <div className="flex gap-4">
        <Link className="border-2 p-2 rounded" href={`/posts/${post.id}/edit`}>
          수정
        </Link>
        <button
          className="border-2 p-2 rounded"
          onClick={() => {
            deletePost(post.id);
          }}
        >
          삭제
        </button>
      </div>

      <h2 className="p-2">댓글 목록</h2>

      {postComments.length === 0 && <div>댓글이 없습니다.</div>}

      {postComments.length > 0 && (
        <ul>
          {postComments.map((postComment) => (
            <li key={postComment.id}>
              {postComment.id} : {postComment.content}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
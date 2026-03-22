"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ArticleInsert, ArticleUpdate } from "@/lib/types";

export async function createArticle(data: ArticleInsert) {
  const supabase = await createClient();
  const { data: article, error } = await supabase
    .from("articles")
    .insert(data)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/articles");
  redirect(`/admin/articles/${article.id}/edit`);
}

export async function updateArticle(id: string, data: ArticleUpdate) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("articles")
    .update(data)
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/articles");
  revalidatePath(`/admin/articles/${id}/edit`);
}

export async function deleteArticle(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("articles").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/articles");
  redirect("/admin/articles");
}

export async function togglePublishArticle(
  id: string,
  currentStatus: string
) {
  const newStatus = currentStatus === "published" ? "draft" : "published";
  const supabase = await createClient();

  const updateData: Record<string, unknown> = { status: newStatus };
  if (newStatus === "published") {
    updateData.published_at = new Date().toISOString();
  }

  const { error } = await supabase
    .from("articles")
    .update(updateData)
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/articles");
}

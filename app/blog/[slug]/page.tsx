import type { Metadata } from "next";
import Scroll from "@/app/components/scroll";
import { ArrowUpCircle } from "lucide-react";
import { fullBlog } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { title } from "process";

export const revalidate = 30;

async function getData(slug: string) {
  const query = `
   *[_type == "blog" && slug.current == '${slug}']{
      "currentSlug": slug.current,
      title,
      smallDescription,
      content1,
      content2,
      titleImage,
      contentImage
   }[0]
   `;
  const data = await client.fetch(query);
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const blog: fullBlog = await getData(params.slug);
  return {
    title: blog.title,
    description: blog.smallDescription,
  };
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullBlog = await getData(params.slug);

  return (
    <section>
      <Scroll />
      <Link
        className="scroll-smooth fixed bottom-4 right-4 bg-[#06061c] w-[3.5rem] h-[3.5rem] text-white backdrop-blur-[0.5rem] dark:bg-white dark:text-gray-950 text-bold border border-black border-opacity-40 shadow-2xl rounded-full flex items-center opacity-85  justify-center hover:scale-[1.15] active:scale-105 transition-all"
        href={""}
      >
        <ArrowUpCircle className="h-[1.8rem] w-[1.8rem]" />
      </Link>
      <div className="mt-8">
        <h1>
          <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
            Muhammad Umer - Blog
          </span>
          <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
            {data.title}
          </span>
        </h1>

        <Image
          src={urlFor(data.titleImage).url()}
          priority
          width={800}
          height={400}
          className="rounded-lg mt-8 border "
          alt="Title Image"
        />

        <div className="mt-16 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary">
          <PortableText value={data.content1} />
        </div>
        <Image
          src={urlFor(data.contentImage).url()}
          priority
          width={800}
          height={400}
          className="rounded-lg mt-8 border "
          alt=""
        />
        <div className="mt-16 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary">
          <PortableText value={data.content2} />
        </div>
      </div>
    </section>
  );
}

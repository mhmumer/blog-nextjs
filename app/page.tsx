import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { simpleBlogCard } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity"
import Image from 'next/image'
import Link from "next/link";

async function getData() {
  const query = ` 
  *[_type=='blog'] {
    title,
    smallDescription,
    'currentSlug':slug.current,
    titleImage
  }`

  const data=await client.fetch(query)

  return data;
}


async function Home() {
  const data: simpleBlogCard[] = await getData();
  console.log(data)
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 mt-5 gap-5">
      {data.map((post, idx) => (
        <Card key={idx}>
          <Image src={urlFor(post.titleImage).url()} alt="Image" width={500} height={500} className="rounded-t-lg h-[200px] object-cover" />
          <CardContent className="mt-5">
            <h3 className="text-lg line-clamp-2 font-bold">{post.title}</h3>
              <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">{post.smallDescription}</p>
            <Button asChild className="w-full mt-7">
              <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
              </Button>
          </CardContent>
        </Card>
      ))}
   </div>
  )
}
export default Home
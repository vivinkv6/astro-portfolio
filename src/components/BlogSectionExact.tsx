import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import type { BlogPost } from "@/types/content";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" }
  })
};

function BlogCard({ blog }: { blog: BlogPost }) {
  return (
    <a href={`/blogs/${blog.slug}`}>
      <motion.div
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.98 }}
        className="group bg-secondary border-border flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10"
      >
        <div className="relative h-48 w-full flex-shrink-0 overflow-hidden">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="h-full w-full">
            <img
              src={blog.coverImage || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800"}
              alt={blog.title}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
        <div className="p-4">
          <time className="text-tertiary-content text-xs">
            {new Date(blog.published).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </time>
          <h3 className="text-neutral group-hover:text-accent mt-2 line-clamp-2 text-base font-semibold transition-colors duration-300">
            {blog.title}
          </h3>
          <p className="text-tertiary-content mt-2 line-clamp-2 text-sm">{blog.content}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {blog.labels?.slice(0, 3).map((label) => (
              <span key={label} className="bg-accent/10 text-accent rounded-full px-2 py-0.5 text-xs font-medium">
                {label}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </a>
  );
}

export default function BlogSectionExact({ blogs, title = "Latest Blogs", limit }: { blogs: BlogPost[]; title?: string; limit?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const displayBlogs = typeof limit === "number" ? blogs.slice(0, limit) : blogs;
  const showViewMore = typeof limit === "number" && blogs.length > limit;

  return (
    <section id="blogs" className="overflow-hidden py-12">
      <div className="mx-auto max-w-[1200px] px-4">
        <motion.h2 initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }} className="text-neutral mb-8 text-2xl font-bold">
          <span className="text-accent mr-2">//</span>
          {title}
        </motion.h2>

        <motion.div ref={ref} className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {displayBlogs.map((blog, i) => (
            <motion.div key={blog.slug} custom={i} variants={cardVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </motion.div>

        {showViewMore ? (
          <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }} className="mt-8 text-center">
            <a href="/blogs" className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-all hover:translate-x-1 hover:text-accent/80">
              View More Blogs
            </a>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}

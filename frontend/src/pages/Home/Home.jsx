import { PostCard } from "../../components/PostCard/PostCard";
import useFetch from "../../hooks/useFetch";
import "./Home.css"

export default function Home() {
  const { items: posts, postsError } = useFetch("posts");
  
  return (
    <div>
      {posts.length === 0 && <h1>LOADING</h1>}
      {postsError && <h1>Error Fetching Posts</h1>}
      {posts.length > 0 && !postsError && (
        <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center">
          {posts.map((post) => (
            <div key={post._id} className="mt-5 mx-5">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
}

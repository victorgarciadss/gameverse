export default async function PostPage(context: { params: Promise<{ slug: string }> }) {

    const slugResolved = (await context.params).slug;

    const data = await fetch(`http://localhost:3000/api/post/${slugResolved}`, {
        method: "GET",
        cache: "no-store"
    });

    const postFounded = await data.json();
    

    return (
        <main>
            <h1>
                {postFounded.title}
            </h1>
        </main>
    )
}
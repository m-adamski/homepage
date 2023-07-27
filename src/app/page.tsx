import Link from "next/link";

const Homepage = () => {
    return (
        <div className="relative w-full min-h-screen bg-amber-50">
            <p className="fixed right-16 top-16 font-medium text-7xl">12:47</p>
            <p className="fixed left-8 bottom-8">Photo by <Link href="https://example.com" rel="nofollow">Nikola Sample</Link></p>
            <p className="fixed right-8 bottom-8">Lesnica, North Macedonia</p>
        </div>
    );
};

export default Homepage;


import Image from "next/image";


export default function Card({ title, imageSrc }: { title: string; imageSrc: string }) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          width={400}
          height={300}
          className="w-full object-cover h-48"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-600">Explore amazing content related to {title.toLowerCase()}.</p>
        </div>
      </div>
    )
  }  
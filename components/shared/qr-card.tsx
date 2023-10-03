import QRCode from "react-qr-code";
import { getUrl } from "@/lib/getUrl";

interface QRCodeCardProps {
  title: string;
  url: string;
}

export default function QRCodeCard({ title, url }: QRCodeCardProps) {
  const link_url = getUrl(url);

  return (
    <div className="w-full flex justify-center items-center flex-col ">
      <h1 className="capitalize text-lg my-2 ">{title}</h1>
      <div className="w-full flex justify-center items-center">
        <QRCode
          value={link_url}
          className="object-center w-28 h-28 bg-slate-50 p-2 rounded-md"
        />
      </div>
    </div>
  );
}

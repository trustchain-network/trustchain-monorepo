import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/';

interface DashboardNfcListProps {
  nfcs: {
    avatar: {
      src: string;
      alt: string;
      fallback: string;
    };
    nfc: {
      name: string;
      uuid: string;
      scanCount: string;
    };
  }[];
}
export function DashboardNfcList({ nfcs }: DashboardNfcListProps) {
  return (
    <div className="space-y-8">
      {nfcs.map((nfc, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={nfc.avatar.src} alt={nfc.avatar.alt} />
            <AvatarFallback>{nfc.avatar.fallback}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{nfc.nfc.name}</p>
            <p className="text-sm text-muted-foreground">{nfc.nfc.uuid}</p>
          </div>
          <div className="ml-auto font-medium">{nfc.nfc.scanCount}</div>
        </div>
      ))}
    </div>
  );
}

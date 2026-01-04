export const Loading = ({ message = 'Loading...' }: { message?: string }) => (
  <div className="flex items-center justify-center py-10">
    <div className="animate-spin h-5 w-5 rounded-full border-2 border-primary border-t-transparent mr-3" />
    <span className="text-sm text-neutral">{message}</span>
  </div>
);


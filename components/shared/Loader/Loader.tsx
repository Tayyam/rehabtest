type Props = {};

export default function Loader({}: Props) {
  return (
    <div className="flex flex-col min-h-full gap-4 w-full items-center justify-center">
      {/* Spinner Container */}
      <div className="w-20 h-20 border-4 border-t-4 border-secondaryColor border-t-primaryColor  rounded-full animate-spin"></div>
    </div>
  );
}

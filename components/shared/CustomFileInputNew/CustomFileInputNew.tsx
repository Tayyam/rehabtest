"use client";

import React, { useState, useCallback } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export default function CustomFileInputNew({
  file,
  setFile,
}: {
  file: any;
  setFile: any;
}) {
  const [dragActive, setDragActive] = useState<boolean>(false);

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const validateFile = useCallback((file: File): boolean => {
    if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      toast.error("يرجى تحميل ملف jpg/jpeg/png فقط");
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      // 2MB in bytes
      toast.error("الملف كبير جداً. الحد الأقصى هو 2 ميجابايت");
      return false;
    }
    return true;
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile && validateFile(droppedFile)) {
        const fileWithPreview = Object.assign(droppedFile, {
          preview: URL.createObjectURL(droppedFile),
        });
        setFile(fileWithPreview);
      }
    },
    [setFile, validateFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const selectedFile = e.target.files?.[0];
      if (selectedFile && validateFile(selectedFile)) {
        const fileWithPreview = Object.assign(selectedFile, {
          preview: URL.createObjectURL(selectedFile),
        });
        setFile(fileWithPreview);
      }
    },
    [setFile, validateFile]
  );

  // Cleanup preview URL to prevent memory leaks
  React.useEffect(() => {
    return () => {
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
    };
  }, [file]);

  return (
    <div className="w-full  mx-auto  text-center ">
      <div
        className={`relative rounded-[10px] bg-gray py-5 transition-colors
          ${dragActive ? "border-primary bg-primary/5" : "border-gray-200"}
          ${file ? "" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          accept=".jpg,.jpeg,.png"
          onChange={handleChange}
        />

        <div className="space-y-4">
          {file ? (
            <div className="space-y-2">
              <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center">
                <img
                  src={file.preview}
                  alt="Preview"
                  className="w-20 h-20 rounded-full object-cover"
                />
              </div>
              <p className="text-sm text-[#35356A]">{file.name}</p>
            </div>
          ) : (
            <>
              <div className="w-20 h-20 mx-auto rounded-full  flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="135"
                  height="98"
                  viewBox="0 0 135 98"
                  fill="none"
                >
                  <path
                    d="M66.8001 83.997C87.6317 83.997 104.52 67.1086 104.52 46.2026C104.52 25.2967 87.5573 8.4082 66.8001 8.4082C45.9685 8.4082 29.0801 25.2967 29.0801 46.2026C29.0801 67.1086 45.9685 83.997 66.8001 83.997Z"
                    fill="#EAEEF9"
                  />
                  <path
                    d="M102.065 21.4288C103.75 21.4288 105.115 20.0631 105.115 18.3785C105.115 16.6938 103.75 15.3281 102.065 15.3281C100.38 15.3281 99.0146 16.6938 99.0146 18.3785C99.0146 20.0631 100.38 21.4288 102.065 21.4288Z"
                    fill="#E7EBF6"
                  />
                  <path
                    d="M106.527 9.52471C107.677 9.52471 108.61 8.59205 108.61 7.44156C108.61 6.29106 107.677 5.3584 106.527 5.3584C105.376 5.3584 104.443 6.29106 104.443 7.44156C104.443 8.59205 105.376 9.52471 106.527 9.52471Z"
                    fill="#E7EBF6"
                  />
                  <path
                    d="M31.088 21.3543C32.2385 21.3543 33.1712 20.4216 33.1712 19.2711C33.1712 18.1207 32.2385 17.188 31.088 17.188C29.9375 17.188 29.0049 18.1207 29.0049 19.2711C29.0049 20.4216 29.9375 21.3543 31.088 21.3543Z"
                    fill="#E7EBF6"
                  />
                  <path
                    d="M18.3658 61.5294C20.5024 61.5294 22.2345 59.7974 22.2345 57.6607C22.2345 55.5241 20.5024 53.792 18.3658 53.792C16.2292 53.792 14.4971 55.5241 14.4971 57.6607C14.4971 59.7974 16.2292 61.5294 18.3658 61.5294Z"
                    fill="#E7EBF6"
                  />
                  <g filter="url(#filter0_d_703_10657)">
                    <path
                      d="M63.6346 54.4682L38.3843 72.0155C36.9237 73.0208 34.9336 72.6735 33.9112 71.2112L17.1507 47.0289C16.1465 45.5666 16.4934 43.5743 17.954 42.5507L43.2043 25.0034C44.6649 23.9981 46.655 24.3454 47.6774 25.8077L64.4562 49.99C65.4604 51.4523 65.0952 53.4629 63.6346 54.4682Z"
                      fill="url(#paint0_linear_703_10657)"
                    />
                  </g>
                  <path
                    d="M59.7263 51.8185L37.525 67.2455C36.9043 67.6842 36.0462 67.5197 35.608 66.8982L21.7504 46.9016C21.3123 46.2802 21.4766 45.4211 22.0973 44.9824L44.2986 29.5554C44.9194 29.1167 45.7775 29.2812 46.2157 29.9027L60.0732 49.8993C60.5114 50.5207 60.3471 51.3798 59.7263 51.8185Z"
                    fill="#EAEEF9"
                  />
                  <path
                    d="M41.67 51.1257C42.5069 51.3304 42.7105 52.427 42.0028 52.9184L37.5375 56.0196C36.8304 56.5106 35.8746 55.9382 35.9737 55.0831L36.4464 51.0053C36.5157 50.4077 37.093 50.0061 37.6774 50.1491L41.67 51.1257Z"
                    fill="#B0B7C4"
                  />
                  <path
                    d="M48.3712 46.4665C49.2083 46.6705 49.4127 47.767 48.7055 48.259L40.6814 53.8407C39.9742 54.3327 39.0174 53.7598 39.1171 52.9041L39.971 45.5749C40.0405 44.9779 40.6171 44.5767 41.201 44.719L48.3712 46.4665Z"
                    fill="#CED6E2"
                  />
                  <path
                    d="M33.3633 49.222C34.3918 49.222 35.2255 48.3872 35.2255 47.3576C35.2255 46.3279 34.3918 45.4932 33.3633 45.4932C32.3347 45.4932 31.501 46.3279 31.501 47.3576C31.501 48.3872 32.3347 49.222 33.3633 49.222Z"
                    fill="#B0B7C4"
                  />
                  <g filter="url(#filter1_d_703_10657)">
                    <path
                      d="M94.2173 69.4014L70.7562 49.5145C69.4052 48.3629 69.2408 46.334 70.3728 44.9814L89.379 22.5173C90.5292 21.1647 92.5558 21.0002 93.9069 22.1334L117.368 42.0203C118.719 43.1719 118.883 45.2008 117.751 46.5534L98.7452 69.0175C97.5949 70.3701 95.5683 70.5347 94.2173 69.4014Z"
                      fill="url(#paint1_linear_703_10657)"
                    />
                  </g>
                  <path
                    d="M95.7686 64.9419L75.1375 47.4677C74.5532 46.9742 74.4802 46.1151 74.9732 45.5302L90.6747 26.9593C91.1677 26.3744 92.0258 26.3013 92.61 26.7948L113.241 44.269C113.825 44.7625 113.898 45.6216 113.405 46.2065L97.7039 64.7774C97.2109 65.3623 96.3528 65.4354 95.7686 64.9419Z"
                    fill="#EAEEF9"
                  />
                  <path
                    d="M91.762 47.2812C91.7788 48.1421 90.7721 48.6204 90.1154 48.0635L85.9716 44.5494C85.3151 43.9926 85.622 42.9217 86.4738 42.7972L90.537 42.2031C91.1327 42.1161 91.6697 42.5712 91.6815 43.173L91.762 47.2812Z"
                    fill="#B0B7C4"
                  />
                  <path
                    d="M98 52.5569C98.019 53.4189 97.0112 53.8993 96.3536 53.3418L88.8964 47.0198C88.2392 46.4627 88.5471 45.3908 89.3998 45.2674L96.6938 44.2116C97.288 44.1256 97.8235 44.5789 97.8368 45.1792L98 52.5569Z"
                    fill="#CED6E2"
                  />
                  <path
                    d="M93.2666 40.1556C94.2951 40.1556 95.1289 39.3208 95.1289 38.2912C95.1289 37.2615 94.2951 36.4268 93.2666 36.4268C92.2381 36.4268 91.4043 37.2615 91.4043 38.2912C91.4043 39.3208 92.2381 40.1556 93.2666 40.1556Z"
                    fill="#B0B7C4"
                  />
                  <g filter="url(#filter2_d_703_10657)">
                    <path
                      d="M83.5935 49.0195L53.393 54.8365C51.6489 55.1675 49.9649 54.0239 49.6205 52.2941L44.0283 23.4046C43.6952 21.6606 44.8372 19.9783 46.5671 19.6359L76.7676 13.8189C78.5117 13.4879 80.1956 14.6314 80.5401 16.3612L86.1323 45.2507C86.4653 46.9947 85.3234 48.677 83.5935 49.0195Z"
                      fill="url(#paint2_linear_703_10657)"
                    />
                  </g>
                  <path
                    d="M81.0901 45.0155L54.5433 50.1396C53.7925 50.2855 53.0774 49.804 52.9306 49.0533L48.3009 25.179C48.1541 24.4283 48.6349 23.7138 49.3857 23.5679L75.9325 18.4438C76.6832 18.2979 77.3984 18.7794 77.5452 19.5301L82.1749 43.4044C82.3217 44.1551 81.8408 44.8696 81.0901 45.0155Z"
                    fill="#EAEEF9"
                  />
                  <path
                    d="M64.819 37.0664C65.5004 37.5928 65.2421 38.677 64.3965 38.8397L59.0612 39.8661C58.2159 40.0287 57.5738 39.1184 58.0106 38.3767L60.0943 34.8382C60.3998 34.3194 61.091 34.1862 61.5674 34.5543L64.819 37.0664Z"
                    fill="#B0B7C4"
                  />
                  <path
                    d="M72.8396 35.5114C73.5232 36.0368 73.2659 37.1232 72.4193 37.2862L62.8193 39.1346C61.9733 39.2975 61.331 38.3858 61.7693 37.644L65.5181 31.2987C65.8235 30.7818 66.5124 30.6486 66.9885 31.0145L72.8396 35.5114Z"
                    fill="#CED6E2"
                  />
                  <path
                    d="M60.2094 31.4299C60.8541 30.6284 60.7262 29.4556 59.9239 28.8102C59.1215 28.1649 57.9485 28.2914 57.3039 29.0928C56.6593 29.8943 56.7871 31.0671 57.5895 31.7125C58.3918 32.3578 59.5648 32.2313 60.2094 31.4299Z"
                    fill="#B0B7C4"
                  />
                  <path
                    d="M84.0026 67.162C83.6477 68.6704 83.1154 70.2675 82.4943 71.5984C80.8084 74.8813 78.1466 77.4544 74.8637 79.1402C71.4921 80.826 67.4994 81.5359 63.5066 80.6486C54.1015 78.6966 48.0681 69.4689 50.0201 60.0639C51.9721 50.6588 61.111 44.5366 70.5161 46.5773C73.8877 47.2871 76.8157 48.9729 79.3001 51.2799C83.4703 55.45 85.2448 61.4835 84.0026 67.162Z"
                    fill="#C5494C"
                  />
                  <path
                    d="M72.5564 62.1046H68.5637V58.1119C68.5637 57.3133 67.9426 56.6035 67.0554 56.6035C66.2568 56.6035 65.547 57.2246 65.547 58.1119V62.1046H61.5543C60.7557 62.1046 60.0459 62.7257 60.0459 63.613C60.0459 64.5002 60.667 65.1213 61.5543 65.1213H65.547V69.1141C65.547 69.9126 66.1681 70.6224 67.0554 70.6224C67.8539 70.6224 68.5637 70.0013 68.5637 69.1141V65.1213H72.5564C73.355 65.1213 74.0648 64.5002 74.0648 63.613C74.0648 62.7257 73.355 62.1046 72.5564 62.1046Z"
                    fill="white"
                  />
                  <defs>
                    <filter
                      id="filter0_d_703_10657"
                      x="0.210461"
                      y="16.2463"
                      width="81.1797"
                      height="80.894"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="8.18383" />
                      <feGaussianBlur stdDeviation="8.18383" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_703_10657"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_703_10657"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter1_d_703_10657"
                      x="53.2544"
                      y="13.198"
                      width="81.6152"
                      height="81.5068"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="8.18383" />
                      <feGaussianBlur stdDeviation="8.18383" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_703_10657"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_703_10657"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter2_d_703_10657"
                      x="27.603"
                      y="5.57789"
                      width="74.9551"
                      height="73.8672"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="8.18383" />
                      <feGaussianBlur stdDeviation="8.18383" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_703_10657"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_703_10657"
                        result="shape"
                      />
                    </filter>
                    <linearGradient
                      id="paint0_linear_703_10657"
                      x1="40.7847"
                      y1="23.3162"
                      x2="40.7847"
                      y2="73.1079"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#FDFEFF" />
                      <stop offset="0.9964" stop-color="#ECF0F5" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_703_10657"
                      x1="94.0461"
                      y1="20.2537"
                      x2="94.0461"
                      y2="70.6788"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#FDFEFF" />
                      <stop offset="0.9964" stop-color="#ECF0F5" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_703_10657"
                      x1="45.1896"
                      y1="18.3492"
                      x2="84.4816"
                      y2="49.9534"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#FDFEFF" />
                      <stop offset="0.9964" stop-color="#ECF0F5" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <p className="text-16 font-medium text-[#35356A]">
                company profile pictures{" "}
              </p>
            </>
          )}
          <p className="text-14 text-dgray">
            Images must be of type (png, jpg) and not exceed 2 MB.{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

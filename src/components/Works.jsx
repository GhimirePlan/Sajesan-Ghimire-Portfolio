// Add this SVG for ResearchGate icon
const ResearchGateIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-8 h-8"
  >
    <path d="M19.586 0h-15.172c-2.583 0-4.414 1.831-4.414 4.414v15.172c0 2.583 1.831 4.414 4.414 4.414h15.172c2.583 0 4.414-1.831 4.414-4.414v-15.172c0-2.583-1.831-4.414-4.414-4.414zm-10.586 16.721h-2v-8h2v8zm-1-9.132c-.552 0-1-.449-1-1s.448-1 1-1 1 .449 1 1-.448 1-1 1zm11 9.132h-2v-4.639c0-.724-.012-1.654-1.006-1.654-.997 0-1.15.785-1.15 1.596v4.697h-2v-8h1.918v.879h.027c.256-.484.883-.992 1.817-.992 1.943 0 2.301 1.279 2.301 2.943v5.17z"/>
  </svg>
);

// In your project card component, replace the github icon with ResearchGate
<div
  onClick={() => window.open(sourceCodeLink, "_blank")}
  className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
>
  <ResearchGateIcon />
</div> 
import {GitHubCalendar} from "react-github-calendar";

export default function GithubGraph() {
  return (
    <div className="flex justify-center overflow-x-auto">
      <GitHubCalendar
        username="YOUR_GITHUB_USERNAME"
        blockSize={15}
        blockMargin={5}
        fontSize={16}
      />
    </div>
  );
}


export interface Task {
  id: number;
  title: string;
  description: string;
  status: boolean;
  priority: "High" | "Medium" | "Low" | "None";
}

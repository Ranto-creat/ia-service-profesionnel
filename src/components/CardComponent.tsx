"use client";

import { BookOpen, GraduationCap, Star, ArrowRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    provider: string;
    type: "free" | "premium";
    duration: string;
    rating: number;
    url: string;
  };
  className?: string;
}

export function CourseCard({ course, className }: CourseCardProps) {
  return (
    <Card
      className={cn(
        "h-full flex flex-col group",
        "border border-slate-700 bg-slate-800/50 backdrop-blur-sm",
        "hover:shadow-lg hover:shadow-slate-900/30 hover:border-slate-600",
        "transition-all duration-300 ease-in-out",
        "transform hover:-translate-y-1",
        className
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <Badge
            variant={course.type === "free" ? "free" : "premium"}
            className={cn(
              "flex-shrink-0 font-medium",
              course.type === "free"
                ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/30"
                : "bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border-purple-500/30"
            )}
          >
            {course.type === "free" ? "Gratuit" : "Premium"}
          </Badge>
          <div className="flex items-center gap-1">
            <span className="flex items-center text-amber-400">
              {"★".repeat(Math.floor(course.rating))}
              <span className="ml-1 text-sm text-slate-400">
                ({course.rating})
              </span>
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <CardTitle className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-indigo-300 transition-colors">
          {course.title}
        </CardTitle>

        <div className="flex items-center gap-2 text-slate-300 mb-3">
          <GraduationCap className="h-4 w-4 text-indigo-400 flex-shrink-0" />
          <CardDescription className="text-slate-300">
            {course.provider}
          </CardDescription>
        </div>

        <div className="flex items-center gap-2 text-slate-300">
          <BookOpen className="h-4 w-4 text-indigo-400 flex-shrink-0" />
          <CardDescription className="text-slate-300">
            {course.duration}
          </CardDescription>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          variant="outline"
          className={cn(
            "w-full group/button",
            "border border-slate-600 bg-slate-700/50",
            "text-blue-200 hover:text-white hover:bg-indigo-600/50",
            "transition-all duration-200",
            "flex items-center justify-between"
          )}
          asChild
        >
          <a href={course.url} target="_blank" rel="noopener noreferrer">
            <span>Voir le cours</span>
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/button:translate-x-1" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}

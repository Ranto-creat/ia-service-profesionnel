"use client"

import { useState } from "react";
import { Search, BookOpen, MapPin, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Course {
  id: string;
  title: string;
  provider: string;
  type: "free" | "premium";
  duration: string;
  rating: number;
  url: string;
}

function HardSkill() {
  const [selectedProfession, setSelectedProfession] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showLocalCourses, setShowLocalCourses] = useState(false);

  const dummyCourses: Course[] = [
    {
      id: "1",
      title: "Introduction au Développement Web",
      provider: "OpenClassrooms",
      type: "free",
      duration: "40h",
      rating: 4.5,
      url: "#",
    },
    {
      id: "2",
      title: "Data Science Fundamentals",
      provider: "Coursera",
      type: "premium",
      duration: "60h",
      rating: 4.8,
      url: "#",
    },
    {
      id: "3",
      title: "Introduction au Développement Web",
      provider: "Coursera",
      type: "free",
      duration: "60h",
      rating: 4.8,
      url: "#",
    },
    {
      id: "4",
      title: "Introduction au Développement Web",
      provider: "Coursera",
      type: "free",
      duration: "60h",
      rating: 4.8,
      url: "#",
    },
    {
      id: "5",
      title: "Introduction au Développement Web",
      provider: "Coursera",
      type: "premium",
      duration: "60h",
      rating: 4.8,
      url: "#",
    },
    {
      id: "6",
      title: "Introduction au Développement Web",
      provider: "Coursera",
      type: "premium",
      duration: "60h",
      rating: 4.8,
      url: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-white">
            Recherche Hard Skills
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Rechercher un métier
              </label>
              <div className="relative">
                <Input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg 
                           text-white placeholder-slate-400
                           focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                           transition-all duration-200 border-transition-all"
                  placeholder="Ex: Développeur Web, Data Scientist..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
              </div>
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                className="w-full md:w-auto text-blue-100"
                onClick={() => setShowLocalCourses(!showLocalCourses)}
              >
                <MapPin className="mr-2 h-4 w-4" />
                {showLocalCourses
                  ? "Formations en ligne"
                  : "Formations locales"}
              </Button>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyCourses.map((course) => (
            <div
              key={course.id}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 
                       shadow-xl overflow-hidden hover:shadow-2xl hover:border-slate-600 
                       transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      course.type === "free"
                        ? "bg-emerald-900/50 text-emerald-400 border border-emerald-700"
                        : "bg-purple-900/50 text-purple-400 border border-purple-700"
                    }`}
                  >
                    {course.type === "free" ? "Gratuit" : "Premium"}
                  </span>
                  <span className="flex items-center text-amber-400">
                    {"★".repeat(Math.floor(course.rating))}
                    <span className="ml-1 text-sm text-slate-400">
                      ({course.rating})
                    </span>
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {course.title}
                </h3>
                <div className="flex items-center text-slate-300 mb-4">
                  <GraduationCap className="h-5 w-5 mr-2 text-indigo-400" />
                  <span>{course.provider}</span>
                </div>
                <div className="flex items-center text-slate-300 mb-6">
                  <BookOpen className="h-5 w-5 mr-2 text-indigo-400" />
                  <span>{course.duration}</span>
                </div>
                <Button className="w-full text-blue-200" variant="outline" asChild>
                  <a href={course.url}>Voir le cours</a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default HardSkill;

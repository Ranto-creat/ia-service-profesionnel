'use client';

import {  useState } from 'react';
import { Search,  MapPin} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CourseCard } from '@/components/CardComponent';

interface Course {
    id: string;
    title: string;
    provider: string;
    type: 'free' | 'premium';
    duration: string;
    rating: number;
    url: string;
    description: string;
}

function HardSkill() {
  //  const [selectedProfession, setSelectedProfession] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showLocalCourses, setShowLocalCourses] = useState(false);
    const [searchResults, setSearchResults] = useState<Course[]>([]); 

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        const formattedQuery = searchQuery.trim().replace(/\s+/g, '+'); 
        const apiUrl = `https://fetch-websites.vercel.app/api/search?q=${formattedQuery}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const coursesFromApi = data.results.map((result: any) => ({
                id: result.title, 
                title: result.title,
                provider: result.type,
                type: result.type === 'gratuit' ? 'free' : 'premium',
                duration: result.duration,
                rating: parseFloat(result.evaluation),
                url: result.link,
                description: result.summary,
            }));

            setSearchResults(coursesFromApi);
        } catch (error) {
            console.error('Erreur de recherche:', error);
        }
    };

    return (
      <div className="min-h-screen py-4">
        <header>
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-zinc-200">
              Recherche Hard Skills
            </h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className=" bg-transparent backdrop-blur-sm rounded-xl border border-slate-700 shadow-xl p-6 mb-8">
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
       transition-all duration-200"
                    placeholder="Rechercher des formations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                </div>
              </div>
              <div className="flex items-end">
                <Button
                  variant="outline"
                  className="w-full md:w-auto border border-slate-600 bg-slate-700/50 text-blue-200 hover:text-white hover:bg-indigo-600/50 transition-all duration-200"
                  onClick={() => setShowLocalCourses(!showLocalCourses)}
                >
                  <MapPin className="mr-2 h-4 w-4 " />
                  {showLocalCourses
                    ? "Formations en ligne"
                    : "Formations locales"}
                </Button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.length > 0 ? (
              searchResults.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center gap-8 py-12 px-4 text-center">


                {/* Suggestions interactives */}
                <div className="flex flex-wrap justify-center gap-3">
                  {[
                    "Développement Web",
                    "Data Science",
                    "Design UX",
                    "Marketing Digital",
                  ].map((topic) => (
                    <button
                      key={topic}
                      onClick={() => setSearchQuery(topic)}
                      className="px-4 py-2 bg-slate-800 hover:bg-indigo-800/30 rounded-full text-sm font-medium text-indigo-300 transition-colors border border-slate-700 hover:border-indigo-400"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    );
}

export default HardSkill;

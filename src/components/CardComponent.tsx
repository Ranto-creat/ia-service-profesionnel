"use client";

import { BookOpen, GraduationCap, Star, ArrowRight, X } from "lucide-react";
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
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { DialogHeader } from "./ui/dialog";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    provider: string;
    type: "free" | "premium";
    duration: string;
    rating: number;
    description: string;
    url: string;
  };
  className?: string;
}

export function CourseCard({ course, className }: CourseCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
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
            onClick={() => setIsModalOpen(true)}
          >
            <span>Voir</span>
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/button:translate-x-1" />
          </Button>
        </CardFooter>
      </Card>

      {/* Modal Centré */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent
          className={cn(
            "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", // Centrage parfait
            "w-full max-w-2xl", // Largeur maximale
            "bg-slate-800 border border-slate-700 rounded-lg", // Style de base
            "shadow-2xl shadow-slate-900/50", // Ombre portée
            "max-h-[90vh] overflow-y-auto", // Hauteur maximale avec défilement si nécessaire
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95", // Animation d'entrée
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95", // Animation de sortie
            "focus:outline-none z-30" // Supprime l'outline
          )}
        >
          {/* En-tête du modal */}
          <DialogHeader className="sticky top-0 bg-slate-800 z-10 p-6 pb-0">
            <div className="flex justify-between items-start">
              <div>
                <DialogTitle className="text-2xl text-white font-bold">
                  {course.title}
                </DialogTitle>
                <DialogDescription className="text-slate-300 mt-1">
                  Par {course.provider}
                </DialogDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-white rounded-full"
                onClick={() => setIsModalOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </DialogHeader>

          {/* Contenu principal avec défilement */}
          <div className="p-6 pt-4 space-y-6">
            {/* Section Description */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">
                Description du cours
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {course.description ||
                  "Aucune description disponible pour ce cours."}
              </p>
            </div>

            {/* Section Compétences */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">
                Ce que vous allez apprendre
              </h3>
              <ul className="space-y-3">
                {[
                  "Maîtriser les fondamentaux du sujet",
                  "Appliquer les connaissances dans des projets pratiques",
                  "Développer des compétences professionnelles",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <span className="text-emerald-400">✓</span>
                    </div>
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section Détails */}
            <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-3">
                Détails du cours
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-slate-400">Type de cours</p>
                  <Badge
                    variant={course.type === "free" ? "free" : "premium"}
                    className={
                      course.type === "free"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-purple-500/20 text-purple-400"
                    }
                  >
                    {course.type === "free" ? "Gratuit" : "Premium"}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-slate-400">Durée</p>
                  <p className="text-white">{course.duration}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-slate-400">Niveau</p>
                  <p className="text-white">Débutant/Intermédiaire</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-slate-400">Évaluation</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                    <span className="text-white">
                      {course.rating.toFixed(1)}/5
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pied de page fixe */}
          <div className="sticky bottom-0 bg-slate-800 border-t border-slate-700 p-4">
            <div className="flex flex-col gap-3">
              <Button
                variant="outline"
                className="w-full text-white border-slate-600 hover:bg-slate-700"
                onClick={() => setIsModalOpen(false)}
              >
                Fermer
              </Button>
              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                asChild
              >
                <a href={course.url} target="_blank" rel="noopener noreferrer">
                  Accéder au cours
                </a>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

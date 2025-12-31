import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "@/types/userInfo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, User, Shield, Sparkles, Network, Cpu } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<UserInfo>>({
    name: "",
    age: undefined,
    gender: undefined,
    status: undefined,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isValid =
    form.name &&
    form.name.trim().length >= 2 &&
    form.age &&
    form.age >= 10 &&
    form.age <= 100 &&
    form.gender &&
    form.status;

  const validateField = (field: string, value: unknown) => {
    const newErrors = { ...errors };

    if (field === "name") {
      if (!value || (value as string).trim().length < 2) {
        newErrors.name = "Name must be at least 2 characters";
      } else {
        delete newErrors.name;
      }
    }

    if (field === "age") {
      const age = Number(value);
      if (!value || isNaN(age) || age < 10 || age > 100) {
        newErrors.age = "Age must be between 10 and 100";
      } else {
        delete newErrors.age;
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = () => {
    if (isValid) {
      navigate("/quiz", { state: { userInfo: form as UserInfo } });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Colorful gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10 pointer-events-none" />

      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 -left-32 w-96 h-96 bg-gradient-to-br from-primary/15 to-accent/5 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-40 -right-32 w-80 h-80 bg-gradient-to-tl from-accent/15 to-primary/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-primary/5 to-success/5 rounded-full blur-3xl" />

        {/* Tech-oriented shapes */}
        <div className="absolute top-32 right-20 opacity-20">
          <Network className="w-24 h-24 text-primary" />
        </div>
        <div className="absolute bottom-48 left-16 opacity-15">
          <Cpu className="w-20 h-20 text-accent" />
        </div>
      </div>

      <Header />

      <main className="relative z-10 pt-24 pb-20">
        <div className="container px-4">
          <div className="max-w-lg mx-auto">
            {/* Header */}
            <div className="text-center mb-8 animate-fade-up opacity-0 stagger-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Personalized Assessment
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Let's Personalize Your Assessment
              </h1>
              <p className="text-muted-foreground text-lg">
                A few quick details to help us tailor your results
              </p>
            </div>

            {/* Form Card */}
            <div className="bg-card rounded-3xl p-8 shadow-elevated border border-border/50 animate-fade-up opacity-0 stagger-2">
              <div className="space-y-6">
                {/* Name field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      value={form.name || ""}
                      onChange={(e) => {
                        setForm({ ...form, name: e.target.value });
                        validateField("name", e.target.value);
                      }}
                      className="pl-10 h-12"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>

                {/* Age field */}
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-sm font-medium">
                    Age
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    min={10}
                    max={100}
                    value={form.age || ""}
                    onChange={(e) => {
                      const value = e.target.value ? Number(e.target.value) : undefined;
                      setForm({ ...form, age: value });
                      validateField("age", value);
                    }}
                    className="h-12"
                  />
                  {errors.age && (
                    <p className="text-sm text-destructive">{errors.age}</p>
                  )}
                </div>

                {/* Gender field */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Gender</Label>
                  <RadioGroup
                    value={form.gender || ""}
                    onValueChange={(value) =>
                      setForm({ ...form, gender: value as UserInfo["gender"] })
                    }
                    className="flex flex-wrap gap-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male" className="cursor-pointer">
                        Male
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female" className="cursor-pointer">
                        Female
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="prefer-not-to-say"
                        id="prefer-not-to-say"
                      />
                      <Label htmlFor="prefer-not-to-say" className="cursor-pointer">
                        Prefer not to say
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Status field */}
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-sm font-medium">
                    Current Status
                  </Label>
                  <Select
                    value={form.status || ""}
                    onValueChange={(value) =>
                      setForm({ ...form, status: value as UserInfo["status"] })
                    }
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select your status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="school">School Student</SelectItem>
                      <SelectItem value="undergraduate">Undergraduate</SelectItem>
                      <SelectItem value="postgraduate">Postgraduate</SelectItem>
                      <SelectItem value="working">Working Professional</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Privacy Note */}
                <div className="bg-secondary/50 rounded-xl p-4 flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    No emails, usernames, or contact details are collected. This
                    information is used only for anonymized analysis.
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  variant="hero"
                  size="lg"
                  onClick={handleSubmit}
                  disabled={!isValid}
                  className="w-full transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Start Assessment
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="flex items-center justify-center gap-2 mt-6 animate-fade-up opacity-0 stagger-3">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <div className="w-3 h-3 rounded-full bg-muted" />
              <div className="w-3 h-3 rounded-full bg-muted" />
              <span className="text-sm text-muted-foreground ml-2">Step 1 of 3</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Welcome;

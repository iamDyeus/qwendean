import { Globe, Users, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Stats = () => {
  return (
    <section className="py-32">
      <div className="container">
        <h2 className="text-3xl font-bold">
          Why choose our services? <br />
          <span className="text-muted-foreground">Here are some stats</span>
        </h2>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          <Card>
            <CardHeader className="text-center">
              <Globe className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
              <CardTitle className="text-2xl font-bold">500+</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Projects completed worldwide
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <Users className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
              <CardTitle className="text-2xl font-bold">10+</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Years of experience in web development
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <Star className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
              <CardTitle className="text-2xl font-bold">98%</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Customer satisfaction rate
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Stats;

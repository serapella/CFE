import { Card } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Last updated: May 28, 2024
        </p>

        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
          <p className="text-muted-foreground">
            By accessing or using BODYMATTERS, you agree to be bound by these
            Terms of Service and all applicable laws and regulations. If you do
            not agree with any of these terms, you are prohibited from using or
            accessing this site.
          </p>
        </Card>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Use License</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Permission is granted to temporarily access the materials on
                BODYMATTERS&apos;s website for personal, non-commercial use only.
                This is the grant of a license, not a transfer of title, and
                under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to decompile or reverse engineer any software</li>
                <li>Remove any copyright or proprietary notations</li>
                <li>Transfer the materials to another person</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
            <p className="text-muted-foreground">
              The materials on BODYMATTERS&apos;s website are provided on an &apos;as is&apos;
              basis. BODYMATTERS makes no warranties, expressed or implied, and
              hereby disclaims and negates all other warranties including,
              without limitation, implied warranties or conditions of
              merchantability, fitness for a particular purpose, or
              non-infringement of intellectual property or other violation of
              rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Limitations</h2>
            <p className="text-muted-foreground">
              In no event shall BODYMATTERS or its suppliers be liable for any
              damages (including, without limitation, damages for loss of data
              or profit, or due to business interruption) arising out of the use
              or inability to use the materials on BODYMATTERS&apos;s website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Accuracy of Materials
            </h2>
            <p className="text-muted-foreground">
              The materials appearing on BODYMATTERS&apos;s website could include
              technical, typographical, or photographic errors. BODYMATTERS does
              not warrant that any of the materials on its website are accurate,
              complete or current.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Links</h2>
            <p className="text-muted-foreground">
              BODYMATTERS has not reviewed all of the sites linked to its
              website and is not responsible for the contents of any such linked
              site. The inclusion of any link does not imply endorsement by
              BODYMATTERS of the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Modifications</h2>
            <p className="text-muted-foreground">
              BODYMATTERS may revise these terms of service for its website at
              any time without notice. By using this website you are agreeing to
              be bound by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
            <p className="text-muted-foreground">
              These terms and conditions are governed by and construed in
              accordance with the laws and you irrevocably submit to the
              exclusive jurisdiction of the courts in that location.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

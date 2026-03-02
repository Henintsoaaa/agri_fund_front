import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { CreditCard, DollarSign, Wallet } from "lucide-react";
import { useState } from "react";

interface InvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  stage: {
    id: string;
    title: string;
    targetAmount: number;
    collectedAmount: number;
  };
}

export default function InvestmentModal({
  isOpen,
  onClose,
  stage,
}: InvestmentModalProps) {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const remainingAmount = stage.targetAmount - stage.collectedAmount;

  const handleInvest = () => {
    // Logique d'investissement à implémenter
    console.log("Investissement:", {
      amount,
      paymentMethod,
      stageId: stage.id,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-cream">
        <DialogHeader>
          <DialogTitle className="text-2xl text-forest">
            Investir dans ce projet
          </DialogTitle>
          <DialogDescription className="text-sage">
            {stage.title}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-forest font-semibold">
              Montant de l'investissement
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sage" />
              <Input
                id="amount"
                type="number"
                placeholder="Entrez le montant"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-10 border-sage/30 focus:border-forest"
              />
            </div>
            <p className="text-xs text-sage">
              Montant restant à financer:{" "}
              {remainingAmount.toLocaleString("fr-FR")} €
            </p>
          </div>

          <Separator className="bg-sage/30" />

          {/* Payment Method */}
          <div className="space-y-3">
            <Label className="text-forest font-semibold">
              Mode de paiement
            </Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              {/* Card Payment */}
              <div className="flex items-center space-x-3 rounded-lg border border-sage/30 p-4 hover:bg-olive/5 cursor-pointer transition-colors">
                <RadioGroupItem value="card" id="card" />
                <Label
                  htmlFor="card"
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest/10">
                    <CreditCard className="h-5 w-5 text-forest" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-forest">Carte bancaire</p>
                    <p className="text-xs text-sage">
                      Visa, Mastercard, American Express
                    </p>
                  </div>
                </Label>
              </div>

              {/* PayPal */}
              <div className="flex items-center space-x-3 rounded-lg border border-sage/30 p-4 hover:bg-olive/5 cursor-pointer transition-colors">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label
                  htmlFor="paypal"
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0070ba]/10">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#0070ba">
                      <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 00-.794.68l-.04.22-.63 3.993-.032.17a.804.804 0 01-.794.679H7.72a.483.483 0 01-.477-.558L9.22 7.08a.805.805 0 01.793-.679h2.5c3.238 0 5.446 1.313 6.554 4.077z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-forest">PayPal</p>
                    <p className="text-xs text-sage">
                      Paiement sécurisé via PayPal
                    </p>
                  </div>
                </Label>
              </div>

              {/* Bank Transfer */}
              <div className="flex items-center space-x-3 rounded-lg border border-sage/30 p-4 hover:bg-olive/5 cursor-pointer transition-colors">
                <RadioGroupItem value="transfer" id="transfer" />
                <Label
                  htmlFor="transfer"
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-olive/10">
                    <Wallet className="h-5 w-5 text-olive" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-forest">Virement bancaire</p>
                    <p className="text-xs text-sage">
                      Traitement sous 2-3 jours ouvrés
                    </p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Info Box */}
          <div className="rounded-lg bg-olive/5 border border-olive/20 p-4">
            <p className="text-sm text-forest">
              <span className="font-semibold">Information:</span> Votre
              investissement sera sécurisé et traité selon les normes en
              vigueur. Vous recevrez une confirmation par email.
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="border-sage/30 hover:bg-sage/10"
          >
            Annuler
          </Button>
          <Button
            type="button"
            onClick={handleInvest}
            disabled={!amount || Number(amount) <= 0}
            className="bg-forest hover:bg-forest/90 text-cream"
          >
            <DollarSign className="h-4 w-4 mr-2" />
            Confirmer l'investissement
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import { Injectable } from "@nestjs/common";

@Injectable()
export class FeeService {
  private readonly fee: number;

  constructor() {
    this.fee = 30000;
  }

  calculateFee(amount: number): number {
    if(amount >= 1000000) return 0;
    return this.fee;
  }
}
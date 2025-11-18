-- DropForeignKey
ALTER TABLE "buses" DROP CONSTRAINT "buses_operator_id_fkey";

-- DropForeignKey
ALTER TABLE "planes" DROP CONSTRAINT "planes_operator_id_fkey";

-- DropForeignKey
ALTER TABLE "trains" DROP CONSTRAINT "trains_operator_id_fkey";

-- DropIndex
DROP INDEX "buses_operator_id_key";

-- DropIndex
DROP INDEX "planes_operator_id_key";

-- DropIndex
DROP INDEX "trains_operator_id_key";

-- AddForeignKey
ALTER TABLE "buses" ADD CONSTRAINT "buses_operator_id_fkey" FOREIGN KEY ("operator_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trains" ADD CONSTRAINT "trains_operator_id_fkey" FOREIGN KEY ("operator_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "planes" ADD CONSTRAINT "planes_operator_id_fkey" FOREIGN KEY ("operator_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

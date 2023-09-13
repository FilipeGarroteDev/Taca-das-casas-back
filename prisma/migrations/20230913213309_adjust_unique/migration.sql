-- DropIndex
DROP INDEX "Activities_category_key";

-- DropIndex
DROP INDEX "Users_department_key";

-- DropIndex
DROP INDEX "Users_house_key";

-- DropIndex
DROP INDEX "Users_role_key";

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "isFirstAccess" SET DEFAULT true;

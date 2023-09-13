-- CreateTable
CREATE TABLE "Activities" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "category" INTEGER NOT NULL,
    "pts" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Activities_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sessions" (
    "id" SERIAL NOT NULL,
    "token" VARCHAR(200) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Sessions_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserActivities" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "activityId" INTEGER NOT NULL,
    "status" VARCHAR(30) NOT NULL,
    "activityDate" VARCHAR(255) NOT NULL,
    "created_at" VARCHAR(255) NOT NULL DEFAULT now(),

    CONSTRAINT "UserActivities_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "house" VARCHAR(30) NOT NULL,
    "department" VARCHAR(20) NOT NULL,
    "role" VARCHAR(20) NOT NULL,
    "isFirstAccess" BOOLEAN NOT NULL,

    CONSTRAINT "Users_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Activities_name_key" ON "Activities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Activities_category_key" ON "Activities"("category");

-- CreateIndex
CREATE UNIQUE INDEX "Sessions_token_key" ON "Sessions"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Users_name_key" ON "Users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_house_key" ON "Users"("house");

-- CreateIndex
CREATE UNIQUE INDEX "Users_department_key" ON "Users"("department");

-- CreateIndex
CREATE UNIQUE INDEX "Users_role_key" ON "Users"("role");

-- AddForeignKey
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_fk0" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserActivities" ADD CONSTRAINT "UserActivities_fk1" FOREIGN KEY ("activityId") REFERENCES "Activities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserActivities" ADD CONSTRAINT "UserActivities_fk0" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

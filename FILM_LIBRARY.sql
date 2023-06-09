CREATE DATABASE FILM_LIBRARY;
USE FILM_LIBRARY;

CREATE TABLE [dbo].[users] (
    [Id]        INT           IDENTITY (1, 1) NOT NULL,
    [FirstName] VARCHAR (60)  NOT NULL,
    [LastName]  VARCHAR (60)  NOT NULL,
    [UserName]  VARCHAR (30)  NOT NULL,
    [Email]     VARCHAR (90)  NOT NULL,
    [Password]  VARCHAR (256) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

CREATE TABLE [dbo].[Films] (
    [Id]          INT           IDENTITY (1, 1) NOT NULL,
    [Tittle]      VARCHAR (60)  NOT NULL,
    [Director]    VARCHAR (60)  NOT NULL,
    [Description] VARCHAR (450) NOT NULL,
    [ReleaseDate] DATE          NOT NULL,
    [Category]    VARCHAR (90)  NOT NULL,
    [ImagePath]   VARCHAR (300) NOT NULL,
    [UserId]      INT           NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([UserId]) REFERENCES [dbo].[users] ([Id])
);

CREATE TABLE [dbo].[Categories] (
    [Id]     INT          IDENTITY (1, 1) NOT NULL,
    [Name]   VARCHAR (60) NOT NULL,
    [IdUser] INT          NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([IdUser]) REFERENCES [dbo].[users] ([Id])
);


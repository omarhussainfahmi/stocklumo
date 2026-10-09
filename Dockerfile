FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY MarketDesk/MarketDesk.csproj MarketDesk/
RUN dotnet restore MarketDesk/MarketDesk.csproj
COPY MarketDesk/ MarketDesk/
RUN dotnet publish MarketDesk/MarketDesk.csproj -c Release --no-restore -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_HTTP_PORTS=10000
ENV ASPNETCORE_ENVIRONMENT=Production
EXPOSE 10000
USER $APP_UID
ENTRYPOINT ["dotnet", "MarketDesk.dll"]

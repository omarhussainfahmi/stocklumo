using System.Net;
using System.Text.Json;
using MarketDesk.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.FileProviders;

namespace MarketDesk.Tests;

public sealed class ResearchPreviewTests
{
    private static ResearchSnapshot Snapshot()
    {
        var captured = DateTimeOffset.UtcNow;
        var end = new DateTimeOffset(captured.UtcDateTime.Date.AddDays(-1), TimeSpan.Zero);
        var rows = Enumerable.Range(0, 400).Select(i => new PreviewBar(end.AddDays(i - 399).ToUnixTimeSeconds(), 99+i, 102+i, 98+i, 100+i, 1000+i)).ToList();
        return new ResearchSnapshot { Version=1, Source="Longbridge", CapturedAt=captured,
            Histories = new() { ["AAPL"] = rows }, Adjusted = new() { ["AAPL"] = rows.Select(p => p with { Open=p.Open/2, High=p.High/2, Low=p.Low/2, Close=p.Close/2 }).ToList() },
            Intraday = new() { ["AAPL"] = [new(end.AddHours(14).ToUnixTimeSeconds(), 499, 10), new(end.AddHours(15).ToUnixTimeSeconds(), 500, 20)] },
            CalendarFrom=DateOnly.FromDateTime(end.UtcDateTime), CalendarTo=DateOnly.FromDateTime(end.UtcDateTime.AddDays(30)) };
    }
    private sealed class Environment(string name) : IWebHostEnvironment
    {
        public string EnvironmentName { get; set; } = name;
        public string ApplicationName { get; set; } = "Test";
        public string ContentRootPath { get; set; } = "";
        public IFileProvider ContentRootFileProvider { get; set; } = new NullFileProvider();
        public string WebRootPath { get; set; } = "";
        public IFileProvider WebRootFileProvider { get; set; } = new NullFileProvider();
    }
    private static ResearchPreview Create(string file, string environment="Development", bool enabled=true) => new(
        new ConfigurationBuilder().AddInMemoryCollection(new Dictionary<string,string?> { ["ResearchPreview:Enabled"]=enabled.ToString(), ["ResearchPreview:File"]=file }).Build(),
        new Environment(environment), TimeProvider.System);
    private static DefaultHttpContext Context(string ip) { var c=new DefaultHttpContext(); c.Connection.RemoteIpAddress=IPAddress.Parse(ip); return c; }

    [Theory]
    [InlineData("Production",true,"127.0.0.1",false)]
    [InlineData("Staging",true,"127.0.0.1",false)]
    [InlineData("Development",false,"127.0.0.1",false)]
    [InlineData("Development",true,"192.0.2.4",false)]
    [InlineData("Development",true,"127.0.0.1",true)]
    [InlineData("Development",true,"::1",true)]
    public void PreviewRequiresExplicitLocalDevelopment(string environment,bool enabled,string ip,bool expected)
    {
        var file=Path.GetTempFileName();
        try { File.WriteAllText(file,JsonSerializer.Serialize(Snapshot())); Assert.Equal(expected,Create(file,environment,enabled).AvailableFor(Context(ip))); }
        finally { File.Delete(file); }
    }
    [Fact]
    public void InvalidOrMissingFilesFailClosed()
    {
        var file=Path.GetTempFileName();
        try { File.WriteAllText(file,"{broken"); Assert.False(Create(file).AvailableFor(Context("127.0.0.1"))); }
        finally { File.Delete(file); }
        Assert.False(Create(file).AvailableFor(Context("127.0.0.1")));
        Assert.Null(Create(file,"Production").Data);
    }
    [Fact]
    public void RangesActuallySliceAndAdjustmentsStaySeparate()
    {
        var file=Path.GetTempFileName();
        try
        {
            File.WriteAllText(file,JsonSerializer.Serialize(Snapshot()));var preview=Create(file);
            var month=preview.Chart("AAPL","1M")!.Data!.Value;var year=preview.Chart("AAPL","1Y")!.Data!.Value;
            Assert.True(year.GetProperty("c").GetArrayLength()>month.GetProperty("c").GetArrayLength());
            Assert.Equal(5,preview.Chart("AAPL","5D")!.Data!.Value.GetProperty("c").GetArrayLength());
            Assert.Equal(2,preview.Chart("AAPL","1D")!.Data!.Value.GetProperty("c").GetArrayLength());
            var adjusted=preview.Chart("AAPL","1M",true)!.Data!.Value;
            Assert.Equal(month.GetProperty("c")[0].GetDecimal()/2,adjusted.GetProperty("c")[0].GetDecimal());
            Assert.Equal("Unadjusted",month.GetProperty("adjustment").GetString());
            Assert.Equal("Forward-adjusted",adjusted.GetProperty("adjustment").GetString());
            Assert.Null(preview.Chart("../secrets","1M"));Assert.Null(preview.Chart("AAPL","ALL"));Assert.Null(preview.Chart("MSFT","1M"));
        }
        finally { File.Delete(file); }
    }
    [Fact]
    public void CorruptPricesDatesAndCurrencyAreRejected()
    {
        var s=Snapshot();Assert.True(ResearchPreview.Valid(s,DateTimeOffset.UtcNow));
        s.Histories["AAPL"][0]=s.Histories["AAPL"][0] with { Low=1000 };Assert.False(ResearchPreview.Valid(s,DateTimeOffset.UtcNow));
        s=Snapshot();s.Histories["AAPL"][1]=s.Histories["AAPL"][0];Assert.False(ResearchPreview.Valid(s,DateTimeOffset.UtcNow));
        s=Snapshot();s.CapturedAt=DateTimeOffset.UtcNow.AddDays(1);Assert.False(ResearchPreview.Valid(s,DateTimeOffset.UtcNow));
        s=Snapshot();s.Financials["AAPL"]=[new("Q1",new(2026,6,30),new(2026,4,30),"USD",100,10,20)];Assert.False(ResearchPreview.Valid(s,DateTimeOffset.UtcNow));
        s=Snapshot();s.Screener=[new("AAPL","Apple","HKD",null,100,1,100,null,10,1,null,"ok","")];s.ScreenerTotal=1;Assert.False(ResearchPreview.Valid(s,DateTimeOffset.UtcNow));
    }
}

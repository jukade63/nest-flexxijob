import { Logger, NestMiddleware } from "@nestjs/common";

export class LoggerMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP');
    use(req: any, res: any, next: () => void) {
        const { ip, method, originalUrl: url } = req;
        const userAgent = req.get('user-agent') || '';
        res.on('finish', () => {
            const { statusCode } = res;
            this.logger.log(
                `Loggging HTTP request ${method} ${url} ${statusCode} - ${userAgent} ${ip}`
            );
        });
        next();
    }
}
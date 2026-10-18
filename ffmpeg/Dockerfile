# =============================================================================
# vidara FFmpeg Processor — Python + FFmpeg
# Tag convention: ghcr.io/onebyjorah/vidara-ffmpeg:latest
# =============================================================================
FROM python:3.11-slim

WORKDIR /app

# Install FFmpeg and dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    libavcodec-dev \
    libavformat-dev \
    libavutil-dev \
    libswscale-dev \
    libffi-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Create directories and non-root user
RUN mkdir -p /recordings /output && \
    addgroup --system --gid 1001 vidara && \
    adduser --system --uid 1001 --ingroup vidara --no-create-home vidara && \
    chown -R vidara:vidara /app /recordings /output

USER vidara

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=10s --retries=3 --start-period=15s \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8080/health', timeout=5)" || exit 1

LABEL org.opencontainers.image.title="vidara FFmpeg Processor" \
      org.opencontainers.image.description="FFmpeg processing container for vidara" \
      org.opencontainers.image.vendor="JorahOne" \
      org.opencontainers.image.version="2.1.0"

CMD ["python", "processor.py"]

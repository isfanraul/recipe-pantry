FROM python:3.13-slim

# Set the working directory in the container
WORKDIR /app

# Copy the application code into the container
COPY api/ ./

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt \
	&& useradd --create-home --shell /usr/sbin/nologin appuser \
	&& chown -R appuser:appuser /app

USER appuser
ENV PYTHONDONTWRITEBYTECODE=1 \
	PYTHONUNBUFFERED=1 \
	PORT=5000

EXPOSE 5000
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "2", "--access-logfile", "-", "app:app"]
